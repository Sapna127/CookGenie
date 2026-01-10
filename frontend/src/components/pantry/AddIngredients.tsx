import { useState } from "react";
import { Button } from "../ui/button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Input } from "../ui/input";
const AddIngredients = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Add Ingredients</Button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            p: 4,
            borderRadius: 2,
            width: 400,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography variant="h5">Add Ingredients 🍋🍇🍓🌽</Typography>
          <Input type="text" placeholder="Ingredient Name" />
          <Button onClick={() => {}}>Add</Button>
        </Box>
      </Modal>
    </>
  );
};

export default AddIngredients;
