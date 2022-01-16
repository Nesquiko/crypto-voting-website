import { ethers, utils } from "ethers";
import VotingHub from "../chain-info/contracts/VotingHub.json";
import networkMapping from "../chain-info/deployments/map.json";

export const getAddress = async (symbol: string) => {
    const { abi: hubAbi } = VotingHub;

    const votingHubAddress = networkMapping["4"]["VotingHub"][0];

    const votingHubInterface = new utils.Interface(hubAbi);
    var provider = ethers.providers.getDefaultProvider("rinkeby");

    const hub = new ethers.Contract(
        votingHubAddress,
        votingHubInterface,
        provider
    );

    const address = await hub.addressesOfVotingSessions(symbol);

    return address;
};
