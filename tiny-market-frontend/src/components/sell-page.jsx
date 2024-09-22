export const SellPageContents = () => {
    const [paymentMethod, setPaymentMethod] = useState('STX');
    const [paymentAssetContract, setPaymentAssetContract] = useState('');

    const handlePaymentMethodChange = (event) => {
        setPaymentMethod(event.target.value);
    };

    const handleContractAddressChange = (event) => {
        setPaymentAssetContract(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        
        if (paymentMethod === 'STX') {
            // Call the function to fulfill listing with STX
            fulfillListingSTX();
        } else {
            // Call the function to fulfill listing with Sip10-token, passing the contract address
            fulfillListingFT(paymentAssetContract);
        }
    };

    return (
        <div class="container">
            <h1>Sell or Swap</h1>
            <div class="nft-details">
                <div class="nft-image">
                    <img src="stacks.png" alt="NFT Image" id="nftImage"/>
                </div>
                <div class="nft-form">
                    <h2 id="nftName">NFT Name</h2>
                    <form id="sellForm" onSubmit={handleSubmit}>
                        <div class="form-group">
                            <label for="sellMethod">Sell Method</label>
                            <select id="sellMethod" name="sellMethod">
                                <option value="sell">Sell</option>
                                <option value="swap">Swap</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="paymentMethod">Payment Method</label>
                            <select id="paymentMethod" value={paymentMethod} onChange={handlePaymentMethodChange}>
                                <option value="STX">STX</option>
                                <option value="Sip10-token">Sip10-token</option>
                            </select>
                        </div>

                        {paymentMethod === 'Sip10-token' && (
                            <div class="form-group">
                                <label for="paymentAssetContract">Sip10-token Contract Address</label>
                                <input type="text" id="paymentAssetContract" value={paymentAssetContract} onChange={handleContractAddressChange} placeholder="Enter contract address"/>
                            </div>
                        )}

                        <div class="form-row">
                            <div class="form-group">
                                <label for="sellPrice">Sell Price</label>
                                <input type="text" id="sellPrice" name="sellPrice" placeholder="0.00 BTC"/>
                            </div>
                            <div class="form-group">
                                <label for="swapNFT">Swap</label>
                                <button type="button" id="swapNFT" disabled>Choose NFT</button>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="expiryDate">Expiry Date</label>
                                <select id="timePeriod" name="expiryDate">
                                    <option value="1">1 hour</option>
                                    <option value="12">12 hours</option>
                                    <option value="24">1 day</option>
                                    <option value="72">3 days</option>
                                    <option value="168">7 days</option>
                                    <option value="744">31 days</option>
                                </select>
                            </div>
                        </div>
                        <button type="submit">Continue</button>
                    </form>
                </div>
            </div>
        </div>
    );
};
