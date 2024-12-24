import React, { useEffect } from "react";
import { useWeb3Context } from "../contexts/useWeb3Context";
import { connectWallet } from "../utils/connectWallet";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";

export default function Wallet() {
  const spans = Array(200).fill(null);
  const navigate = useNavigate();
  const { updateWeb3State, web3State } = useWeb3Context();
  const { selectedAccount } = web3State;

  useEffect(() => {
    if (selectedAccount) {
      navigate("/home");
    }
  }, [selectedAccount, navigate]);

  const openNotification = () => {
    notification.success({
      message: "Wallet Connected",
      description: "Your wallet has been successfully connected.",
      placement: "topRight",
    });
  };

  const handleWalletConnection = async () => {
    try {
      const result = await connectWallet();
      if (result && result.contractInstance && result.selectedAccount) {
        updateWeb3State(result);
        openNotification(); // Show success notification
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      notification.error({
        message: "Connection Failed",
        description: "Failed to connect your wallet. Please try again.",
        placement: "topRight",
      });
    }
  };

  useEffect(() => {
    const spanElements = document.querySelectorAll("section span");
    spanElements.forEach((span) => {
      const delay = Math.random() * 5;
      span.style.animationDelay = `${delay}s`;
    });
  }, []);

  return (
    <div className="wrapper">
      <section>
        {spans.map((_, index) => (
          <span key={index} className="animate-span"></span>
        ))}
        <div className="signin">
          <div className="content">
            <h2>Crypted Vault ₿</h2>
            <div className="form">
              <div className="inputBx">
                <input
                  type="submit"
                  value="Connect Wallet"
                  onClick={handleWalletConnection}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


