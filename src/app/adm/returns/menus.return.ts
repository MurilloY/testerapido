export interface Permission {
    per_id: string;
    per_name: string;
    menus_id: string;
    required: boolean;
    default_selected: boolean;
}

export interface Menu {
    menu_id: string;
    menu_name: string;
    menu_icon: string;
    menu_link: string;
    menu_cat_id: string;
    menu_cat_name: string;
    menu_pan_id: number;
    menu_pan_name: string;
    selected: boolean;
    permissions: Permission[];
}

export interface ReturnMenus {
    message: string;
    menus: Menu[];
    refreshToken: string;
}