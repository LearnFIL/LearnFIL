# LearnFIL P2P Progress Sync Experiment

This directory contains an **experimental peer-to-peer progress synchronization prototype** built with **py-libp2p**.

The goal of this experiment is to explore whether **learning progress updates** in LearnFIL can be shared **directly between peers**, without relying on a central backend or server, while remaining simple, inspectable, and easy to reason about.

This work is intentionally scoped as a **research and experimentation phase**, not a production feature.

---

## What This Experiment Demonstrates

* Peer-to-peer communication using `py-libp2p`
* A custom, application-level protocol for learning progress updates
* One-way, fire-and-forget message delivery
* No backend server
* No database
* No blockchain dependency
* Clean separation from the main TypeScript LearnFIL application

A running peer can receive progress updates from another peer and print them locally in real time.

---

## Project Structure

```
experiments/
└── learnfil-p2p/
    ├── learnfil_p2p/
    │   ├── __init__.py
    │   ├── cli.py
    │   ├── node.py
    │   └── protocol.py
    │
    ├── pyproject.toml
    ├── README.md
    └── .venv/
```

---

## File-by-File Overview

### `learnfil_p2p/cli.py`

Defines the **command-line interface** for the experiment.

Responsibilities:

* Parses CLI arguments
* Exposes two commands: `listen` and `send`
* Delegates all networking logic to `node.py`
* Keeps user interaction separate from protocol logic

This file is intentionally thin and human-friendly.

---

### `learnfil_p2p/node.py`

Implements the **core peer-to-peer networking logic** using `py-libp2p`.

Responsibilities:

* Creates and manages libp2p hosts
* Sets up QUIC transport
* Registers stream handlers for the custom protocol
* Sends and receives progress update messages
* Enforces a one-way, fire-and-forget communication pattern
* Suppresses low-level transport noise for clean output

This file contains the heart of the experiment.

---

### `learnfil_p2p/protocol.py`

Defines the **application-level protocol** used between peers.

Responsibilities:

* Declares the protocol identifier (`PROTOCOL_ID`)
* Defines the `ProgressMessage` data structure
* Handles serialization and deserialization
* Makes the protocol explicit and versionable

---

### `learnfil_p2p/__init__.py`

Marks the directory as a Python package.

No runtime logic lives here.

---

### `pyproject.toml`

Defines the experiment as an **installable Python package**.

Responsibilities:

* Declares dependencies (`libp2p`, `trio`, `multiaddr`)
* Registers the `learnfil-p2p` CLI entry point
* Enables editable installs for local experimentation

---

### `README.md`

Documentation for the experiment.

Responsibilities:

* Explains purpose and scope
* Documents setup and usage
* Clarifies limitations
* Provides context for reviewers and future contributors

---

### `.venv/`

Local Python virtual environment.

* Not committed to version control
* Used only to isolate dependencies during development

---

## How the Protocol Works

1. A **listener peer** starts and binds to a UDP QUIC port.
2. A **sender peer** connects using a libp2p multiaddress.
3. The sender opens a stream using a custom protocol ID.
4. A `ProgressMessage` is sent once.
5. The listener reads the message, prints it, and closes the stream.
6. No response is sent back.

This is a **one-way protocol by design**.

---

## Message Structure

Each progress update is sent as a structured message:

```python
ProgressMessage(
    version=1,
    user="fatuma",
    lesson_id="lesson-001",
    status="completed",
    timestamp=1771245854,
)
```

The message is serialized to bytes before transmission and deserialized on receipt.

---

## Setup Instructions

### Prerequisites

* Python 3.10 or newer
* `pip`
* Windows, macOS, or Linux

---

### Step 1: Navigate to the experiment directory

```powershell
cd experiments/learnfil-p2p
```

---

### Step 2: Create and activate a virtual environment

```powershell
python -m venv .venv
.venv\Scripts\activate
```

You should see `(.venv)` in your terminal prompt.

---

### Step 3: Install the experiment in editable mode

```powershell
python -m pip install -e .
```

This installs the `learnfil-p2p` CLI locally.

---

## Running the Experiment

You will need **two terminals**.

---

### Terminal 1: Start the listener

```powershell
learnfil-p2p listen --port 8000
```

Example output:

```
🟢 LearnFIL P2P listener running
Peer ID: 16Uiu2HAm...
Listening on: /ip4/0.0.0.0/udp/8000/quic/p2p/16Uiu2HAm...

Use this destination in another terminal (replace 0.0.0.0 with 127.0.0.1):
learnfil-p2p send --destination /ip4/0.0.0.0/udp/8000/quic/p2p/16Uiu2HAm... --user fatuma --lesson lesson-001 --status completed
```

---

### Terminal 2: Send a progress update

Replace `0.0.0.0` with `127.0.0.1`.

```powershell
learnfil-p2p send `
  --destination /ip4/127.0.0.1/udp/8000/quic/p2p/<PEER_ID> `
  --user fatuma `
  --lesson lesson-001 `
  --status completed
```

Sender output:

```
✅ Progress update sent successfully
```

---

### Listener Output

```
📩 Received progress update
User: fatuma
Lesson: lesson-001
Status: completed
Timestamp: 1771245854
```

At this point, the experiment has succeeded.

---

## Networking Notes

### Why `127.0.0.1` Instead of `0.0.0.0`

* `0.0.0.0` is valid for **listening**
* It is **not** valid for connecting
* `127.0.0.1` correctly targets the local machine

This is standard networking behavior.

---

### Windows QUIC Note

On Windows, libp2p QUIC may emit low-level transport logs during connection teardown.
These messages occur **after successful message delivery** and do not indicate failure.

To keep output clean and readable, transport-level logging is explicitly silenced in `node.py`.

---

## Why This Matters for LearnFIL

This experiment explores a future direction where:

* Learning progress can be shared directly between peers
* Offline or local-first learning is possible
* Central coordination is optional
* The system remains simple and developer-friendly

This is a research step, not a shipped feature.

---

## Status

* Experimental
* Non-production
* Intended for learning, discussion, and further research

