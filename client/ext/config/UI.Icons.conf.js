define([], function () {
    
    var icons = {
                    workspace : [{name: 'Terminal',
                                        cls: 'terminal-icon',
                                        event : [{eventName : 'click',
                                            eventHandler : 'IconClickState'
                                        },
                                        {eventName: 'click',
                                            eventHandler: 'createWin'}],
                                            module: 'terminal'
                                        },
                                        {name: 'Folders',
                                            cls: 'folders-icon',
                                            event : [{eventName : 'click',
                                                eventHandler : 'IconClickState'
                                            }]},
                                        {name: 'Find',
                                                cls: 'find-icon',
                                                event : [{eventName : 'click',
                                                    eventHandler : 'IconClickState'
                                                }]},
                                        {name: 'Enti',
                                                cls: 'enti-class',
                                                event : [{eventName : 'click',
                                                    eventHandler : 'IconClickState'
                                                }]}
                                       ],
                    shortcut :[{name: 'Terminal',
                        cls: 'terminal-icon-small',
                        event : [{eventName : 'click',
                            eventHandler : 'IconClickState'
                        },
                        {eventName: 'click',
                            eventHandler: 'createWin'}],
                            module: 'terminal'}]
    };
    return icons;
});
