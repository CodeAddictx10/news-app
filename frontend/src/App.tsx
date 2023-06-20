import { RouterProvider } from "react-router-dom";
import router from "./router/Index";

function App() {
  return (
    <main className="bg-white-2x dark:bg-black">
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
