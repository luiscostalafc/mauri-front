import { ReactNode } from "react";
import LeftMenu from "../TemplateGeneral/LeftMenu";
import RightMenu from "../TemplateGeneral/RightMenu";

export function AdminPageLayout({ children, leftLayout = null, rightLayout = null }): JSX.Element {
    return (
        <div>

        <div style={{display: 'flex', flexFlow: 'row', justifyContent: 'space-between'}}>
            <div style={leftLayout}>
            <LeftMenu />

            </div>
            <div style={rightLayout}>
            <RightMenu />

            </div>
        </div>
            {children}
        </div>
    )
}