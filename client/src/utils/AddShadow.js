export const addShaddow = (theme, node) => {
    //            --------------             |               |
    //           |              |            |  scrollTop	 |
    //      -----|--------------|-----   |                   |
    //     |     |              |     |  |                   |
    //     |     |              |     |  |   clientHeight	 |   scrollHeight
    //     |     |              |     |  |                   |
    //     |_____|______________|_____|  |                   |
    //           |              |                            |
    //           |______________|                            |

    if (node.scrollTop === 0) {
        if (node.scrollHeight > node.clientHeight) {
            node.style.boxShadow = `inset 0px -4px 10px -6px ${theme.palette.primary.dark}`;
        } else {
            node.style.boxShadow = "none";
        }
        // node.scrollTop > 0
    } else if (node.scrollHeight - node.scrollTop > node.clientHeight) {
        node.style.boxShadow = `inset 0px -4px 10px -6px ${theme.palette.primary.dark}, inset 0px 4px 10px -6px ${theme.palette.primary.dark}`;
    } else {
        node.style.boxShadow = `inset 0px 4px 10px -6px ${theme.palette.primary.dark}`;

    }

};
