from __future__ import annotations

import argparse
import trio

from .node import run_listener, send_message


def main() -> None:
    parser = argparse.ArgumentParser(
        prog="learnfil-p2p",
        description="LearnFIL peer to peer progress experiment",
    )

    sub = parser.add_subparsers(dest="command", required=True)

    listen = sub.add_parser("listen", help="Run a P2P listener")
    listen.add_argument("--port", type=int, default=8000)

    send = sub.add_parser("send", help="Send a progress update")
    send.add_argument("--destination", required=True)
    send.add_argument("--user", required=True)
    send.add_argument("--lesson", required=True)
    send.add_argument("--status", required=True)

    args = parser.parse_args()

    if args.command == "listen":
        # IMPORTANT: py-libp2p is Trio-based, not asyncio
        trio.run(run_listener, args.port)

    elif args.command == "send":
        trio.run(
            send_message,
            args.destination,
            args.user,
            args.lesson,
            args.status,
        )