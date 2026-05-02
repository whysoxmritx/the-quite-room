"use client";

import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts';
import useStore from '@/lib/store';

export default function StressTrendChart() {
    const { stressHistory } = useStore();

    // getLast 7
    const data = stressHistory.slice(-7).map(item => ({
        score: item.score,
        date: new Date(item.date).toLocaleDateString()
    }));

    if (data.length < 2) return (
        <div className="h-full flex items-center justify-center text-xs text-text-muted">
            Not enough data for trend
        </div>
    );

    return (
        <div className="h-24 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <YAxis domain={[0, 40]} hide />
                    <Line
                        type="monotone"
                        dataKey="score"
                        stroke="#8CA8FF"
                        strokeWidth={2}
                        dot={{ fill: '#080B14', stroke: '#8CA8FF', strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, fill: '#00f0ff' }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
