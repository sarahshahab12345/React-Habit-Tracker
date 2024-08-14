import React from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

const HabitTable = ({ habits, onEdit, onDelete }) => {
  return (
    <TableContainer
      component={Paper}
      sx={{ mt: 3, boxShadow: "0 3px 5px 2px rgba(44, 62, 80, .3)" }}
    >
      <Table>
        <TableHead sx={{ backgroundColor: "#2C3E50" }}>
          <TableRow>
            <TableCell sx={{ color: "#ffffff" }}>Index</TableCell>
            <TableCell sx={{ color: "#ffffff" }}>Habit</TableCell>
            <TableCell sx={{ color: "#ffffff" }}>Description</TableCell>
            <TableCell sx={{ color: "#ffffff" }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {habits.map((habit, index) => (
            <TableRow
              key={habit.id || index} // Use unique identifier if available
              sx={{
                "&:hover": { backgroundColor: "#EAF0F4" },
              }}
            >
              <TableCell>{index + 1}</TableCell>
              <TableCell>{habit.name}</TableCell>
              <TableCell>{habit.description}</TableCell>
              <TableCell>
                <Button
                  sx={{
                    color: "#2C3E50",
                    "&:hover": { color: "#34495E" },
                  }}
                  onClick={() => onEdit(index)}
                  aria-label="Edit habit"
                >
                  <AiOutlineEdit />
                </Button>
                <Button
                  sx={{
                    color: "#2C3E50",
                    "&:hover": { color: "#34495E" },
                  }}
                  onClick={() => onDelete(index)}
                  aria-label="Delete habit"
                >
                  <AiOutlineDelete />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default HabitTable;
