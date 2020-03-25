import React, { useState, useEffect } from 'react';
import { ResponsiveLine } from '@nivo/line';
import { fetchDaily } from '../../api';

import './global.scss';

const GlobalView = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetchDaily();
                setData(res);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const renderGraph = () => {
        const data = [
            {
                id: 'japan',
                color: 'hsl(127, 70%, 50%)',
                data: [
                    {
                        x: 'plane',
                        y: 90
                    },
                    {
                        x: 'helicopter',
                        y: 4
                    },
                    {
                        x: 'boat',
                        y: 183
                    },
                    {
                        x: 'train',
                        y: 199
                    },
                    {
                        x: 'subway',
                        y: 234
                    },
                    {
                        x: 'bus',
                        y: 157
                    },
                    {
                        x: 'car',
                        y: 57
                    },
                    {
                        x: 'moto',
                        y: 141
                    },
                    {
                        x: 'bicycle',
                        y: 257
                    },
                    {
                        x: 'horse',
                        y: 4
                    },
                    {
                        x: 'skateboard',
                        y: 292
                    },
                    {
                        x: 'others',
                        y: 206
                    }
                ]
            },
            {
                id: 'france',
                color: 'hsl(336, 70%, 50%)',
                data: [
                    {
                        x: 'plane',
                        y: 84
                    },
                    {
                        x: 'helicopter',
                        y: 109
                    },
                    {
                        x: 'boat',
                        y: 155
                    },
                    {
                        x: 'train',
                        y: 290
                    },
                    {
                        x: 'subway',
                        y: 207
                    },
                    {
                        x: 'bus',
                        y: 162
                    },
                    {
                        x: 'car',
                        y: 123
                    },
                    {
                        x: 'moto',
                        y: 60
                    },
                    {
                        x: 'bicycle',
                        y: 261
                    },
                    {
                        x: 'horse',
                        y: 108
                    },
                    {
                        x: 'skateboard',
                        y: 5
                    },
                    {
                        x: 'others',
                        y: 128
                    }
                ]
            },
            {
                id: 'us',
                color: 'hsl(53, 70%, 50%)',
                data: [
                    {
                        x: 'plane',
                        y: 152
                    },
                    {
                        x: 'helicopter',
                        y: 166
                    },
                    {
                        x: 'boat',
                        y: 222
                    },
                    {
                        x: 'train',
                        y: 12
                    },
                    {
                        x: 'subway',
                        y: 146
                    },
                    {
                        x: 'bus',
                        y: 220
                    },
                    {
                        x: 'car',
                        y: 187
                    },
                    {
                        x: 'moto',
                        y: 258
                    },
                    {
                        x: 'bicycle',
                        y: 280
                    },
                    {
                        x: 'horse',
                        y: 172
                    },
                    {
                        x: 'skateboard',
                        y: 276
                    },
                    {
                        x: 'others',
                        y: 224
                    }
                ]
            },
            {
                id: 'germany',
                color: 'hsl(58, 70%, 50%)',
                data: [
                    {
                        x: 'plane',
                        y: 89
                    },
                    {
                        x: 'helicopter',
                        y: 128
                    },
                    {
                        x: 'boat',
                        y: 141
                    },
                    {
                        x: 'train',
                        y: 236
                    },
                    {
                        x: 'subway',
                        y: 189
                    },
                    {
                        x: 'bus',
                        y: 135
                    },
                    {
                        x: 'car',
                        y: 107
                    },
                    {
                        x: 'moto',
                        y: 150
                    },
                    {
                        x: 'bicycle',
                        y: 93
                    },
                    {
                        x: 'horse',
                        y: 184
                    },
                    {
                        x: 'skateboard',
                        y: 288
                    },
                    {
                        x: 'others',
                        y: 117
                    }
                ]
            },
            {
                id: 'norway',
                color: 'hsl(111, 70%, 50%)',
                data: [
                    {
                        x: 'plane',
                        y: 95
                    },
                    {
                        x: 'helicopter',
                        y: 197
                    },
                    {
                        x: 'boat',
                        y: 183
                    },
                    {
                        x: 'train',
                        y: 53
                    },
                    {
                        x: 'subway',
                        y: 249
                    },
                    {
                        x: 'bus',
                        y: 226
                    },
                    {
                        x: 'car',
                        y: 131
                    },
                    {
                        x: 'moto',
                        y: 160
                    },
                    {
                        x: 'bicycle',
                        y: 138
                    },
                    {
                        x: 'horse',
                        y: 259
                    },
                    {
                        x: 'skateboard',
                        y: 125
                    },
                    {
                        x: 'others',
                        y: 41
                    }
                ]
            }
        ];

        return (
            <ResponsiveLine
                data={data}
                margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                xScale={{ type: 'point' }}
                yScale={{
                    type: 'linear',
                    min: 'auto',
                    max: 'auto',
                    stacked: true,
                    reverse: false
                }}
                curve="natural"
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    orient: 'bottom',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'transportation',
                    legendOffset: 36,
                    legendPosition: 'middle'
                }}
                axisLeft={{
                    orient: 'left',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'count',
                    legendOffset: -40,
                    legendPosition: 'middle'
                }}
                colors={{ scheme: 'nivo' }}
                pointSize={7}
                pointColor={{ from: 'color', modifiers: [] }}
                pointBorderWidth={2}
                pointBorderColor={{ from: 'serieColor' }}
                pointLabel="y"
                pointLabelYOffset={-12}
                areaBaselineValue={10}
                useMesh={true}
                legends={[
                    {
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 100,
                        translateY: 0,
                        itemsSpacing: 0,
                        itemDirection: 'left-to-right',
                        itemWidth: 80,
                        itemHeight: 20,
                        itemOpacity: 0.75,
                        symbolSize: 12,
                        symbolShape: 'circle',
                        symbolBorderColor: 'rgba(0, 0, 0, .5)',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemBackground: 'rgba(0, 0, 0, .03)',
                                    itemOpacity: 1
                                }
                            }
                        ]
                    }
                ]}
            />
        );
    };

    return (
        <>
            <div className="global">{renderGraph()}</div>
        </>
    );
};

export default GlobalView;
