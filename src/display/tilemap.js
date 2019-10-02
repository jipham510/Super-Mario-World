export default {
    "tileWidth": 29,
    "tileHeight": 29,
    "spriteSheet": "world",
    "backgrounds": [
        {
            "tile": "ground1",
            "type": "ground",
            "ranges": [
                [
                    10, 20, // x range
                    8, 9   // y range
                ], 
                [
                   0, 20,
                   12,13 
                ],
                [
                   0, 10,
                   11,12 
                ],
                [
                    0,5,
                    10,11
                ],
                [
                    0,4,
                    7,8
                ],
                [
                    5,10,
                    8,9
                ]
            ]
        },
       {
            "tile": "ground2",
            "type": "ground",
            "ranges": [
                [
                    0, 20,
                    13, 14
                ]
            ]
        },
       {
            "tile": "cloudMiddle",
           "type": "floatingPlatform",
            "ranges": [
                [
                    0, 8,
                    5, 6
                ]
            ]
        },
       {
           "tile": "cloudLeft",
           "type": "floatingPlatform",
            "ranges": [
                [
                    0, 1,
                    5, 6
                ]
            ]
        },
       {
           "tile": "cloudRight",
           "type": "floatingPlatform",
            "ranges": [
                [
                    7, 8,
                    5, 6
                ]
            ]
        }
    ]
    // "backgrounds": [
    //     {
    //         "tile": "sky",
    //         "ranges": [
    //             [
    //                 0, 212, // x range
    //                 0, 14   // y range
    //             ]
    //         ]
    //     },
    //     {
    //         "tile": "ground1",
    //         "type": "ground",
    //         "ranges": [
    //             [
    //                 0, 212,
    //                 12, 13
    //             ]
    //         ]
    //     },
    //     {
    //         "tile": "ground1",
    //         "type": "ground",
    //         "ranges": [
    //             [
    //                 5, 8,
    //                 9, 10
    //             ],
    //             [
    //                 12, 18,
    //                 11, 12
    //             ],
    //             [
    //                 2, 4,
    //                 11, 12
    //             ],
    //             [
    //                 9, 10,
    //                 0, 9
    //             ]
    //         ]
    //     },
    //     {
    //         "tile": "ground2",
    //         "type": "ground",
    //         "ranges": [
    //             [
    //                 0, 25,
    //                 13, 14
    //             ]
    //         ]
    //     },
    //     {
    //         "tile": "sky",
    //         "ranges": [
    //             [
    //                 20, 22,
    //                 12, 14
    //             ]
    //         ]
    //     }
    // ]
}