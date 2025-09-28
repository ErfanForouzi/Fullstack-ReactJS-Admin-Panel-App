import { BrowserRouter as Router } from "react-router"
import AntdProvider from "./antd"
import ReduxProvider from "./redux"
export default function Providers({children}){
    return(
        <Router>
                <ReduxProvider>
            <AntdProvider>
                {children}
            </AntdProvider>
                </ReduxProvider>
        </Router>
    )
}