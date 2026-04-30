import {cloneTemplate} from "../lib/utils.js";

/**
 * Инициализирует таблицу и вызывает коллбэк при любых изменениях и нажатиях на кнопки
 *
 * @param {Object} settings
 * @param {(action: HTMLButtonElement | undefined) => void} onAction
 * @returns {{container: Node, elements: *, render: render}}
 */
export function initTable(settings, onAction) {
    const {tableTemplate, rowTemplate, before, after} = settings;
    const root = cloneTemplate(tableTemplate);

    before.forEach(item => {    
        root[item] = cloneTemplate(item);
        root.container.prepend(root[item].container);
    })

    after.forEach(item => {    
        root[item] = cloneTemplate(item);
        root.container.append(root[item].container);
    })

    root.container.addEventListener('change', () => {
        onAction();
    });

    const render = (data) => {

        const nextRows = data.map(item => {
            const clone = cloneTemplate(rowTemplate);
            Object.keys(clone.elements).forEach(key => {
                const element = clone.elements[key];
                element.textContent = item[key];
            }); 
            return clone.container
        });
        root.elements.rows.replaceChildren(...nextRows);
    }
    return {...root, render};
}