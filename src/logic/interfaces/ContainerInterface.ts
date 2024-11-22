import { SideBarMenuItems } from "./RouterInterface";

export interface PageContainerProps {
    title: string;
    rightButton?: { label: string; action: () => void };
    isLoading?: boolean,
    mainRoute?: { label: string; href: string };
    primaryRoute?: { label: string; href: string };
    secondaryRoute?: string;
    children?: React.ReactNode;
}


export interface PageContainerWithSideBarProps extends PageContainerProps {
    sideBarItems: SideBarMenuItems[];
}