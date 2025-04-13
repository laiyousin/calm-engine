import {
    Timeline,
    TimelineItem,
    TimelineSeparator,
    TimelineConnector,
    TimelineContent,
    TimelineDot,
    TimelineOppositeContent
} from "@mui/lab";
import { Typography, Box } from "@mui/material";

export default function ScheduleTimeline({ schedule, currentSlot }) {
    const activeIndex = schedule
        .map((item) => item.time)
        .filter((t) => t <= currentSlot)
        .sort()
        .slice(-1)[0];

    return (
        <Timeline position="right">
            {schedule.map((item, index) => {
                const isActive = item.time === activeIndex;

                return (
                    <TimelineItem
                        key={index}
                        className={isActive ? "bg-[#2f3e52] rounded-md shadow-md p-2" : ""}
                    >
                        <TimelineOppositeContent
                            sx={{
                                m: "auto 0",
                                flex: 0.2,
                                fontFamily: "monospace",
                                color: isActive ? "#ffffff" : "#9ca3af"
                            }}
                            align="left"
                            variant="body2"
                        >
                            {item.time}
                        </TimelineOppositeContent>

                        <TimelineSeparator>
                            <TimelineDot
                                sx={{
                                    backgroundColor: item.color,
                                    boxShadow: isActive ? `0 0 10px ${item.color}` : "none"
                                }}
                            />
                            {index !== schedule.length - 1 && <TimelineConnector />}
                        </TimelineSeparator>

                        <TimelineContent sx={{ py: "12px", px: 2 }}>
                            <Typography
                                variant="h6"
                                component="span"
                                className={isActive ? "text-white font-bold" : ""}
                            >
                                {item.title}
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: isActive ? "#ffffff" : "#d1d5db"
                                }}
                            >
                                {item.description}
                            </Typography>
                            {item.color === "#34d399" && item.note && (
                                <Box className="mt-2 p-2 bg-[#3b4a5a] border-l-4 border-[#8FA3BF] text-sm rounded text-[#DDE6F2]">
                                    💬 {item.note}
                                </Box>
                            )}
                        </TimelineContent>
                    </TimelineItem>
                );
            })}
        </Timeline>
    );
}
