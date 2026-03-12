LearnFIL is a learning platform designed to help developers understand and build with the Filecoin ecosystem through structured lessons and interactive exercises.

The project is intentionally modular and focuses on delivering a simple learning experience while allowing the system to evolve as new components are introduced.

---

## System Overview

The LearnFIL platform provides structured learning modules and an interactive interface where learners can explore Filecoin concepts.

The platform currently operates as a standalone learning interface.

Future iterations will integrate additional tools such as **Learny**, an AI learning agent for the Filecoin ecosystem.

---

## Core Components

### LearnFIL Platform

The LearnFIL platform provides the main learning environment.

Responsibilities include:

- delivering structured learning modules
- presenting lesson content
- supporting interactive exercises
- tracking learner progress

The platform is built using modern web technologies and is designed to remain simple and extensible.

---

### Learny (AI Learning Agent)

Learny is a separate project designed to act as an AI learning companion for the Filecoin ecosystem.

Learny is not currently integrated into the LearnFIL platform but is being developed as a complementary tool.

Learny repository:

https://github.com/learnfil/learny

Future versions of LearnFIL may integrate Learny to support interactive explanations and guided learning.

---

## Repository Structure

The LearnFIL repository is organized to separate platform code, documentation, and infrastructure configuration.

```

learnfil
├─ src
│  ├─ components
│  ├─ hooks
│  ├─ lib
│  └─ utils
│
├─ supabase
│  └─ migrations
│
├─ docs
│  ├─ architecture.md
│  ├─ curriculum.md
│  ├─ development.md
│  └─ contributing.md
│
└─ public

```

---

## Design Principles

The architecture of LearnFIL follows several guiding principles.

**Simplicity**

The platform prioritizes a clear and accessible learning experience.

**Modularity**

New components such as AI tools or additional learning modules can be added without restructuring the core platform.

**Extensibility**

The system is designed to support future capabilities including expanded exercises, analytics, and AI-assisted learning.

---

## Future Evolution

Planned areas of evolution include:

- deeper learning modules
- improved interactive exercises
- integration with the Learny AI learning agent
- expanded developer tooling
```

