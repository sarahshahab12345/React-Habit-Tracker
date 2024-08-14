import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Tooltip,
  IconButton,
  Box,
  Grid,
} from "@mui/material";
import { FaCheck, FaTimes } from "react-icons/fa";
import BasicPie from "./Chart.jsx/BasicPie";
import BasicBars from "./Chart.jsx/BasicBars";
import LoadingSkeleton from "./LoadingSkeleton";

const ViewWeekly = () => {
  const [habits, setHabits] = useState(() => {
    const storedHabits = localStorage.getItem("habits");
    return storedHabits ? JSON.parse(storedHabits) : [];
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedHabits = JSON.parse(localStorage.getItem("habits"));
    if (storedHabits) {
      setHabits(storedHabits);
    }
    setLoading(false);
  }, []);

  const toggleStatus = (habitIndex, day) => {
    const updatedHabits = [...habits];
    updatedHabits[habitIndex].status[day] =
      !updatedHabits[habitIndex].status[day];
    setHabits(updatedHabits);
    localStorage.setItem("habits", JSON.stringify(updatedHabits));
  };

  const getPreviousDates = () => {
    const currentDate = new Date();
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return Array.from({ length: 7 }, (_, i) => {
      const prevDate = new Date(currentDate);
      prevDate.setDate(currentDate.getDate() - i);
      return {
        dayOfWeek: days[prevDate.getDay()],
        date: prevDate.getDate(),
        month: prevDate.getMonth() + 1,
      };
    }).reverse();
  };

  const previousDates = getPreviousDates();

  const chartData = {
    labels: previousDates.map(
      (date) => `${date.dayOfWeek} ${date.date}/${date.month}`
    ),
    datasets: habits.map((habit, index) => ({
      label: habit.name,
      data: previousDates.map((date) => (habit.status[date.dayOfWeek] ? 1 : 0)),
      backgroundColor: `rgba(${44 - index * 5}, ${62 + index * 5}, ${
        80 + index * 5
      }, 0.2)`,
      borderColor: `rgba(${44 - index * 5}, ${62 + index * 5}, ${
        80 + index * 5
      }, 1)`,
      borderWidth: 1,
    })),
  };

  const pieChartData = habits.map((habit) => ({
    label: habit.name,
    value: Object.values(habit.status).filter((status) => status).length,
  }));

  const pieChartColors = [
    "#2C3E50", // Midnight Blue
    "#34495E", // Darker Midnight Blue
    "#22313F", // Deep Blue-Gray
    "#1B2631", // Very Dark Blue-Gray
    "#2E4053", // Dark Slate Blue
    "#2A3D45", // Charcoal Blue
    "#1A242F", // Blackened Blue
    "#253647", // Steel Blue
    "#1C2833", // Black-Blue
    "#273746", // Deep Slate Blue
    "#2D3A45", // Gunmetal Blue
    "#22303C", // Dark Gunmetal Blue
  ];
  const barChartColors = [
    "#2C3E50", // Midnight Blue
    "#34495E", // Darker Midnight Blue
    "#22313F", // Deep Blue-Gray
    "#1B2631", // Very Dark Blue-Gray
    "#2E4053", // Dark Slate Blue
    "#2A3D45", // Charcoal Blue
    "#1A242F", // Blackened Blue
    "#253647", // Steel Blue
    "#1C2833", // Black-Blue
    "#273746", // Deep Slate Blue
    "#2D3A45", // Gunmetal Blue
    "#22303C", // Dark Gunmetal Blue
  ];

  return (
    <div
      style={{ padding: "20px", backgroundColor: "#ffffff", color: "#000000" }}
    >
      {loading ? (
        <LoadingSkeleton />
      ) : (
        <>
          <Typography variant="h4" sx={{ color: "#2C3E50" }} gutterBottom>
            Weekly Habits Progress
          </Typography>

          <Grid container spacing={3} style={{ marginBottom: "20px" }}>
            <Grid item xs={12}>
              <TableContainer
                component={Paper}
                style={{ backgroundColor: "#34495e", color: "#ffffff" }}
              >
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell
                        style={{ fontWeight: "bold", color: "#ffffff" }}
                      >
                        Habit
                      </TableCell>
                      {previousDates.map((date, index) => (
                        <TableCell
                          key={index}
                          style={{ fontWeight: "bold", color: "#ffffff" }}
                        >
                          {date.dayOfWeek} - {date.date}/{date.month}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {habits.map((habit, habitIndex) => (
                      <TableRow key={habitIndex}>
                        <TableCell>
                          <Typography
                            variant="h6"
                            style={{ fontWeight: "bold", color: "#ffffff" }}
                          >
                            {habit.name}
                          </Typography>
                          <Typography
                            variant="body2"
                            style={{ color: "#d0d0d0" }}
                          >
                            {habit.description}
                          </Typography>
                        </TableCell>
                        {previousDates.map((date) => (
                          <TableCell
                            key={date.dayOfWeek}
                            onClick={() =>
                              toggleStatus(habitIndex, date.dayOfWeek)
                            }
                            style={{
                              cursor: "pointer",
                              textAlign: "center",
                              transition: "background-color 0.3s ease",
                              color: "#ffffff",
                            }}
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.backgroundColor =
                                "#5d6d7e")
                            }
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.backgroundColor =
                                "#34495e")
                            }
                          >
                            <Tooltip
                              title={
                                habit.status[date.dayOfWeek]
                                  ? "Mark undone"
                                  : "Mark done"
                              }
                            >
                              <IconButton>
                                {habit.status[date.dayOfWeek] ? (
                                  <FaCheck
                                    style={{ color: "green" }}
                                    size={24}
                                  />
                                ) : (
                                  <FaTimes style={{ color: "red" }} size={24} />
                                )}
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="h5"
                sx={{ color: "#2C3E50", marginBottom: 5 }}
                gutterBottom
              >
                Habit Progress Graph
              </Typography>
              <Box
                sx={{
                  height: 350,
                  width: "80%",
                  margin: "0 auto",
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" }, 
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 2, 
                }}
              >
                <BasicBars chartData={chartData} colors={barChartColors} />
                <BasicPie data={pieChartData} colors={pieChartColors} />
              </Box>
            </Grid>
          </Grid>
        </>
      )}
    </div>
  );
};

export default ViewWeekly;
