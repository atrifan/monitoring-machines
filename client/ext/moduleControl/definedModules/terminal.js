define([], function() {
   
    var terminal = {
            tag: 'div',
            cls: 'terminal-wrapper',
            items: [ {
                tag: 'div',
                cls: 'terminal-display'
            },
            {tag: 'input',
                type: 'text',
                cls: 'terminal-write',
                event: [{eventName: 'keydown',
                        eventHandler: 'sendMessage'
                        }
                       ]
            }
            ]
                    
    };
    
    return terminal;
});