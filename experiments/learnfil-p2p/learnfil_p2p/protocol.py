import json
import time
from dataclasses import dataclass, asdict
from typing import Any

from libp2p.custom_types import TProtocol

PROTOCOL_ID = TProtocol("/learnfil/progress/1.0.0")


@dataclass
class ProgressMessage:
    user: str
    lesson_id: str
    status: str
    timestamp: int

    @staticmethod
    def create(user: str, lesson_id: str, status: str) -> "ProgressMessage":
        return ProgressMessage(
            user=user,
            lesson_id=lesson_id,
            status=status,
            timestamp=int(time.time()),
        )

    def to_bytes(self) -> bytes:
        return json.dumps(asdict(self)).encode("utf-8")

    @staticmethod
    def from_bytes(data: bytes) -> "ProgressMessage":
        obj: dict[str, Any] = json.loads(data.decode("utf-8"))
        return ProgressMessage(
            user=obj["user"],
            lesson_id=obj["lesson_id"],
            status=obj["status"],
            timestamp=int(obj["timestamp"]),
        )