import { Outlet } from "react-router-dom";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import { Toaster } from "./components/ui/sonner";

const App = () => {
  return (
    <>
      <Header />
      <main className="container my-4 min-h-[calc(100vh-134px)]">
        <Outlet />
      </main>
      <Footer />
      <Toaster position="bottom-left" richColors duration={3000} />
    </>
  );
};

export default App;
