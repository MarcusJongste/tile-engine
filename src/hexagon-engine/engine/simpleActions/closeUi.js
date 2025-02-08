
export default function closeUi(caller, { uiName }) {
    return [{
        target: { name: uiName, uiOpen: caller.id },
            value: {
                delete: {
                    allChildren: true,
                }
            }
        }];
}