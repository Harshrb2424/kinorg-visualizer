# KinOrg-Visualizer

**KinOrg-Visualizer** is a high-performance, professional hierarchy mapping tool for families and organizations. Unlike traditional tools, it requires **no server, no database, and no login.** Your data stays in your browser's local storage. You own your data; you can export it as a `.json` file, share it, or keep it offline forever.

---

## Key Features

### No Backend, Total Privacy
* **Local-First:** All nodes and relationships are stored in your browser's IndexedDB.
* **Zero Server-Side:** No data ever leaves your machine unless you explicitly export it.
* **Offline Ready:** Works perfectly without an internet connection.

### Rich Dynamic Profiles
* **Media Support:** Upload and store profile images (Base64) directly within nodes.
* **Bio-Data:** Dedicated fields for Date of Birth (DOB), Location, and Personal Notes.
* **Professional Tracking:** Log Work History, Education, and Role seniority.
* **Schema-less Notes:** Add custom "blocks" of information to any person in the tree.

### Advanced Visualization
* **React Flow Powered:** Smooth zooming, panning, and drag-and-drop node placement.
* **Hybrid Layouts:** Switch between "Family Tree" (horizontal/biological) and "Org Chart" (vertical/professional) views.
* **Smart Connections:** Easily define Parent-Child, Manager-Report, or Custom relationships.

### Portability
* **JSON Export:** Download your entire hierarchy as a single `.json` file.
* **Instant Import:** Drag and drop a saved file to reconstruct your tree instantly on any device.

---

## Tech Stack

* **Core:** React 18 + Vite
* **Graph Engine:** [React Flow](https://reactflow.dev/)
* **Styling:** Tailwind CSS + Headless UI
* **State/Storage:** Dexie.js (IndexedDB wrapper)
* **Icons:** Lucide-React

---

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn or bun

### Installation
1. **Clone the repo**
   ```bash
   git clone [https://github.com/Harshrb2424/kinorg-visualizer.git](https://github.com/Harshrb2424/kinorg-visualizer.git)

```

2. **Install dependencies**
```bash
cd kinorg-visualizer
npm install

```


3. **Run the development server**
```bash
npm run dev

```



---

## Data Structure

The app exports a `.json` file with the following schema:

```json
{
  "metadata": { "version": "1.0", "name": "My Family Tree" },
  "nodes": [
    {
      "id": "1",
      "data": {
        "label": "Jane Doe",
        "role": "CEO / Matriarch",
        "avatar": "data:image/png;base64...",
        "bio": {
          "dob": "1985-06-12",
          "location": "San Francisco",
          "education": "MBA Stanford"
        }
      }
    }
  ],
  "edges": [{ "id": "e1-2", "source": "1", "target": "2", "type": "smoothstep" }]
}

```

---

## License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 👋 Support

If you find this project useful, feel free to star the repo!
