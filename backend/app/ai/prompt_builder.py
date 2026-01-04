def build_prompt(ingredients: list[str]) -> str:
    return (
        f"You are a creative chef. Given the ingredients: {', '.join(ingredients)}, "
        "suggest a unique recipe using most of them.\n\n"
        "IMPORTANT: Return ONLY valid JSON, no markdown, no code blocks, no extra text.\n\n"
        "Return a JSON object with exactly these fields:\n"
        "- title (string): Recipe name\n"
        "- ingredients (array of strings): List of ingredients\n"
        "- instructions (string): Step-by-step cooking instructions\n"
        "- tags (array of strings): Recipe tags like 'vegetarian', 'quick', etc.\n"
        "- substitutions (object, optional): Object with ingredient as key and array of substitutions as value\n"
        "- pantry_mode (boolean, optional): Whether this is a pantry recipe\n\n"
        "Example format:\n"
        '{"title": "Recipe Name", "ingredients": ["ing1", "ing2"], "instructions": "Step 1...", "tags": ["tag1"], "pantry_mode": false}\n\n'
        "Return ONLY the JSON object, nothing else:"
    )