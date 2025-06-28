def build_prompt(ingredients: list[str]) -> str:
    return (
        f"You are a creative chef. Given the ingredients: {', '.join(ingredients)}, "
        "suggest a unique recipe using most of them. Return JSON with the following fields:\n"
        "title (string), ingredients (list of strings), instructions (string), and tags (list of strings)."
    )
