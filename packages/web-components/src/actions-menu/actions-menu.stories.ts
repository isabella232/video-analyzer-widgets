import { ActionsMenuComponent } from '.';
import { AvaDesignSystemProvider } from '../../../styles';
import { DELETE_SVG_PATH, MORE_SVG_PATH, RENAME_SVG_PATH } from '../../../styles/svg/svg.shapes';
import { IAction } from './actions-menu.definitions';
import { Localization } from './../../../common/services/localization/localization.class';

// Prevent tree-shaking
AvaDesignSystemProvider;
ActionsMenuComponent;

interface ITemplate {
    darkTheme?: boolean;
    opened?: boolean;
}

const ActionsMenuComponentTemplate = (data: ITemplate) => {
    const designSystem = document.createElement('ava-design-system-provider');
    designSystem.setAttribute('use-defaults', '');
    designSystem.style.height = '400px';
    (designSystem as AvaDesignSystemProvider).theme = (data?.darkTheme && 'dark') || '';
    const actionsMenu = document.createElement('media-actions-menu') as ActionsMenuComponent;

    actionsMenu.actions = actions;
    actionsMenu.opened = data.opened || false;
    designSystem.appendChild(actionsMenu);
    return designSystem;
};

export const ActionsMenu = (args: ITemplate) => ActionsMenuComponentTemplate(args);

const actions: IAction[] = [
    {
        label: Localization.dictionary.ACTIONS_MENU_Rename,
        svgPath: RENAME_SVG_PATH
    },
    {
        label: Localization.dictionary.ACTIONS_MENU_Delete,
        svgPath: DELETE_SVG_PATH
    }
];

export default {
    title: Localization.dictionary.ACTIONS_MENU_ComponentTitle,
    argTypes: {
        darkTheme: { control: 'boolean', defaultValue: true },
        opened: { control: 'boolean', defaultValue: false }
    }
};
