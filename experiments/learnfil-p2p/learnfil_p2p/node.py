from __future__ import annotations

import logging
import time
import trio
from typing import Optional

from multiaddr import Multiaddr
from libp2p import new_host
from libp2p.crypto.secp256k1 import create_new_key_pair
from libp2p.network.stream.net_stream import INetStream
from libp2p.peer.peerinfo import info_from_p2p_addr

from .protocol import PROTOCOL_ID, ProgressMessage


# Silence libp2p / QUIC teardown noise on Windows
logging.disable(logging.CRITICAL)


async def _handle_stream(stream: INetStream) -> None:
    """
    One-way handler.
    Read message, print it, close stream.
    Never write. Never respond.
    """
    try:
        data = await stream.read()
        if not data:
            return

        msg = ProgressMessage.from_bytes(data)

        print("\n📩 Received progress update")
        print(f"User: {msg.user}")
        print(f"Lesson: {msg.lesson_id}")
        print(f"Status: {msg.status}")
        print(f"Timestamp: {msg.timestamp}")

    finally:
        try:
            await stream.close()
        except Exception:
            pass


def _make_key(seed: Optional[int] = None):
    if seed is not None:
        import random
        random.seed(seed)
        secret = random.getrandbits(256).to_bytes(32, "big")
        return create_new_key_pair(secret)

    return create_new_key_pair()


async def run_listener(port: int, seed: Optional[int] = None) -> None:
    host = new_host(
        key_pair=_make_key(seed),
        enable_quic=True,
    )

    listen_addr = Multiaddr(f"/ip4/0.0.0.0/udp/{port}/quic")

    async with host.run(listen_addrs=[listen_addr]):
        host.set_stream_handler(PROTOCOL_ID, _handle_stream)

        peer_id = host.get_id().to_string()

        print("\n🟢 LearnFIL P2P listener running")
        print("Peer ID:", peer_id)

        for addr in host.get_addrs():
            print("Listening on:", addr)

        destination = f"{listen_addr}/p2p/{peer_id}"
        print(
            "\nUse this destination in another terminal "
            "(replace 0.0.0.0 with 127.0.0.1):"
        )
        print(
            f"learnfil-p2p send --destination {destination} "
            f"--user fatuma --lesson lesson-001 --status completed"
        )

        await trio.sleep_forever()


async def send_message(
    destination: str,
    user: str,
    lesson_id: str,
    status: str,
    seed: Optional[int] = None,
) -> None:
    host = new_host(
        key_pair=_make_key(seed),
        enable_quic=True,
    )

    async with host.run(listen_addrs=[]):
        peer_info = info_from_p2p_addr(Multiaddr(destination))
        await host.connect(peer_info)

        stream = await host.new_stream(peer_info.peer_id, [PROTOCOL_ID])

        msg = ProgressMessage(
            user=user,
            lesson_id=lesson_id,
            status=status,
            timestamp=int(time.time()),
        )

        await stream.write(msg.to_bytes())
        await stream.close()

        print("✅ Progress update sent successfully")

        # Allow QUIC to flush before teardown
        await trio.sleep(0.05)