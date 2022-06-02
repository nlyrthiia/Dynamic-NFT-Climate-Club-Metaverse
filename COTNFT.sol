// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

pragma solidity ^0.8.0;
contract COTNFT is ERC721{
    using Counters for Counters.Counter;

    struct NFTInfo{
        string imageUrl;
        string background;
        string wing;
        string body;
        string hat;
        string eye;
        string sdg;
        uint256 cot;
        bool neutralized;
    }
    struct ProjectInfo{
        string projectName;
        string projectTitle;
        string location;
        string registry;
        string methodology;
        uint256 totalCOT;
    }
    ProjectInfo public projectInfo;

    Counters.Counter private _childTokenIdCounter;
    uint256 private _totalSupply = 0;
    
    uint256 public maxCOT = 800000;
    uint256 public totalCOTMinted = 0;
    
    uint256[] private _mintedTokenIds;
    
    mapping(uint256 => NFTInfo) private _tokenInfo;
    mapping(address => uint256[]) private _tokensOfAddress;

    constructor(ProjectInfo memory _projectInfo) ERC721("DCCMdNFT", "DCCM") {
        projectInfo = _projectInfo;
        _childTokenIdCounter._value = 101;
    }
    function uint2str(uint256 _i)
    internal
    pure
    returns (string memory _uintAsString)
    {
        if (_i == 0) {
            return "0";
        }
        uint j = _i;
        uint len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint k = len;
        while (_i != 0) {
            k = k - 1;
            uint8 temp = (48 + uint8(_i - (_i / 10) * 10));
            bytes1 b1 = bytes1(temp);
            bstr[k] = b1;
            _i /= 10;
        }
        return string(bstr);
    }
    //for opensea
    function contractURI() public view returns (string memory) {
        return string(
                abi.encodePacked(
                    "data:application/json;base64,",
                    Base64.encode(
                        bytes(
                            abi.encodePacked(
                                '{"name":"',
                                projectInfo.projectName,
                                '", "description":"',projectInfo.projectTitle,'"}'
                            )
                        )
                    )
                )
            );
    }

    function totalSupply() public view returns(uint256){
        return _totalSupply;
    }

    function mintedTokenIds() public view returns(uint256[] memory) {
        return _mintedTokenIds;
    }

    function split(uint256 tokenId, NFTInfo[] memory nftArray) public {
        require(_exists(tokenId), "nft of the tokenId does not exist");
        require(_isApprovedOrOwner(_msgSender(), tokenId), "split caller is not owner nor approved");
        require(nftArray.length != 0, "nftArray length zero");

        NFTInfo storage originalNFT = _tokenInfo[tokenId];
        
        require(originalNFT.neutralized == false, "token has neutralized");

        uint256 cotTotal = 0;

        for (uint256 i = 0; i < nftArray.length; i++) {
            cotTotal += nftArray[i].cot;
        }

        require(cotTotal <= originalNFT.cot, "cot amount error");

        for (uint256 i = 0; i < nftArray.length; i++) {
            NFTInfo memory info = nftArray[i];
            if (i==0) {
                originalNFT.wing = info.wing;
                originalNFT.background = info.background;
                originalNFT.body = info.body;
                originalNFT.hat = info.body;
                originalNFT.eye = info.eye;
                originalNFT.sdg = info.sdg;
                originalNFT.imageUrl = info.imageUrl;
                originalNFT.cot = info.cot;
            }else {
                uint256 newTokenId = _childTokenIdCounter.current();
                _childTokenIdCounter.increment();
                _totalSupply+=1;

                _tokenInfo[newTokenId] = info;
                _tokensOfAddress[_msgSender()].push(newTokenId);
                _mintedTokenIds.push(newTokenId);

                _safeMint(_msgSender(), newTokenId);
            }
        }
    }

    function neutralize(uint256 tokenId) public {
        require(_exists(tokenId), "nft of the tokenId does not exist");
        require(_isApprovedOrOwner(_msgSender(), tokenId), "neutralize caller is not owner nor approved");
        NFTInfo storage nft = _tokenInfo[tokenId];
        require(!nft.neutralized, "nft already neutralized");

        nft.neutralized = true;
    }

    function mint(uint256 tokenId, address to, NFTInfo memory nftInfo) public {
        require(!_exists(tokenId), "nft is already minted");
        require(totalCOTMinted + nftInfo.cot <= maxCOT, "all nft has been minted");

        totalCOTMinted += nftInfo.cot;
        _totalSupply += 1;
        _tokenInfo[tokenId] = nftInfo;
        _tokensOfAddress[_msgSender()].push(tokenId);
        _mintedTokenIds.push(tokenId);

        _safeMint(to, tokenId);
    }

    function burn(uint256 tokenId) public {
        require(_isApprovedOrOwner(_msgSender(), tokenId), "burn caller is not owner nor approved");
        _burn(tokenId);
    }
    function _assembleMetadata(uint256 tokenId) private view returns (string memory) {
        NFTInfo memory nft = _tokenInfo[tokenId];
        string memory cot = uint2str(nft.cot);
        string memory totalCOT = uint2str(projectInfo.totalCOT);
        string memory neutralized = nft.neutralized ? "true" : "false";
        return string(
                abi.encodePacked(
                    "data:application/json;base64,",
                    Base64.encode(
                        bytes(
                            abi.encodePacked(
                                '{"image":"',
                                nft.imageUrl,
                                '","attributes":[{"trait_type":"Project title","value":"',
                                projectInfo.projectTitle,
                                '"},{"trait_type":"Total COT","value":"',
                                totalCOT,
                                '"},{"trait_type":"Registry","value":"',
                                projectInfo.registry,
                                '"},{"trait_type":"methodology","value":"',
                                projectInfo.methodology,
                                '"},{"trait_type":"wing","value":"',
                                nft.wing,
                                '"},{"trait_type":"body","value":"',
                                nft.body,
                                '"},{"trait_type":"hat","value":"',
                                nft.hat,
                                '"},{"trait_type":"eye","value":"',
                                nft.eye,
                                '"},{"trait_type":"sdg","value":"',
                                nft.sdg,
                                '"},{"trait_type":"neutralized","value":"',
                                neutralized,
                                '"},{"display_type":"number","trait_type":"COT(t)","value":"',
                                 cot,
                                '"}]}'
                            )
                        )
                    )
                )
            );
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        return _assembleMetadata(tokenId);
    }

    function getNFTInfo(uint256 tokenId) public view returns (NFTInfo memory nftInfo) {
        nftInfo = _tokenInfo[tokenId];
    }

    function getTokensOfAddress(address _sender) public view returns (uint256[] memory) {
        return _tokensOfAddress[_sender];
    }
}