import { useGetChoicesForSymbol } from "./hooks/useGetChoicesForSymbol";

interface ChoicesParagraphProps {
    symbol: string;
}

export const ChoicesParagraph = ({ symbol }: ChoicesParagraphProps) => {
    const choices = useGetChoicesForSymbol(symbol);
    var formattedChoices: string = "";
    for (var choice in choices![0]) {
        formattedChoices += choices![0][choice] + " | ";
    }
    return <p>{formattedChoices}</p>;
};
