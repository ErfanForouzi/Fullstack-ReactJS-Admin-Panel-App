import React from "react";
import {createRoot} from "react-dom/client";
import App from "./App";

import "vazirmatn/Vazirmatn-font-face.css";
import Providers from "./providers";

createRoot(document.getElementById("root")).render(
  <>
   <Providers>
   <App />
   </Providers>
  </>
);
