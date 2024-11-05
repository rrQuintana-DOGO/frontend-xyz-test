
export interface SideBarMenuItem {
    name: string;
    route: string;
    show: boolean;
}

export interface RouterInterface extends SideBarMenuItem {
    component: React.ComponentType;
}

export interface SideBarMenuItems {
    parent_name: string;
    childs: SideBarMenuItem[];
}