import { useContractFunction, useEthers } from "@usedapp/core";
import { constants, Contract, utils } from "ethers";
import VotingSession from "../../chain-info/contracts/VotingSession.json";
import { useGetAddressOfSymbol } from "./useGetAddressOfSymbol";

export const useAddChoice = () => {
    const useAddChoiceToSymbol = (newChoice: string, symbol: string) => {
        const { abi } = VotingSession;
        const address = useGetAddressOfSymbol(symbol);

        const votingSessionAddress = address
            ? address[0]
            : constants.AddressZero;

        const votingSessionInterface = new utils.Interface(abi);
        const votingSessionContract = new Contract(
            votingSessionAddress,
            votingSessionInterface
        );

        const { send: addChoiceSend, state: addChoiceState } =
            useContractFunction(votingSessionContract, "addChoice", {
                transactionName: "Add choice.",
            });

        const addChoice = () => {
            return addChoiceSend(newChoice);
        };
        return { addChoice, addChoiceState };
    };

    return useAddChoiceToSymbol;
};
