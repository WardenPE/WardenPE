class TextFormat {

    static ESCAPE = "\xc2\xa7";
    static EOL = "\n";

    static BLACK = TextFormat.ESCAPE + "0";
    static DARK_BLUE = TextFormat.ESCAPE + "1";
    static DARK_GREEN = TextFormat.ESCAPE + "2";
    static DARK_AQUA = TextFormat.ESCAPE + "3";
    static DARK_RED = TextFormat.ESCAPE + "4";
    static DARK_PURPLE = TextFormat.ESCAPE + "5";
    static GOLD = TextFormat.ESCAPE + "6";
    static GRAY = TextFormat.ESCAPE + "7";
    static DARK_GRAY = TextFormat.ESCAPE + "8";
    static BLUE = TextFormat.ESCAPE + "9";
    static GREEN = TextFormat.ESCAPE + "a";
    static AQUA = TextFormat.ESCAPE + "b";
    static RED = TextFormat.ESCAPE + "c";
    static LIGHT_PURPLE = TextFormat.ESCAPE + "d";
    static YELLOW = TextFormat.ESCAPE + "e";
    static WHITE = TextFormat.ESCAPE + "f";
    static MINECOIN_GOLD = TextFormat.ESCAPE + "g";

    static OBFUSCATED = TextFormat.ESCAPE + "k";
    static BOLD = TextFormat.ESCAPE + "l";
    static STRIKETHROUGH = TextFormat.ESCAPE + "m";
    static UNDERLINE = TextFormat.ESCAPE + "n";
    static ITALIC = TextFormat.ESCAPE + "o";

    static RESET = TextFormat.ESCAPE + "r";
}

export default TextFormat;