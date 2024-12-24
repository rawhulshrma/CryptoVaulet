import axios from "axios";
import { useWeb3Context } from "../contexts/useWeb3Context";
import React, { useEffect, useState } from "react";
import { notification } from "antd";
import { CircleArrowLeft, CircleArrowRight } from "lucide-react";

const GetImage = ({ reload }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [imagePerPage] = useState(2);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const { web3State } = useWeb3Context();
  const { selectedAccount, contractInstance } = web3State;

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const ipfsHashes = await contractInstance.viewFiles(selectedAccount);
        const ipfsHashArray = Object.values(ipfsHashes);

        const token = localStorage.getItem("token");
        const response = await axios.post(
          `http://localhost:3000/api/getImage?page=${currentPage}&limit=${imagePerPage}`,
          ipfsHashArray,
          {
            headers: { "x-access-token": token }
          }
        );

        setImages(response.data.depcryptedImageArr);
      } catch (error) {
        notification.error({
          message: 'Error',
          description: 'Failed to fetch images'
        });
      } finally {
        setLoading(false);
      }
    };

    if (contractInstance) {
      fetchImages();
    }
  }, [contractInstance, currentPage, imagePerPage, selectedAccount, reload]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="image-gallery-container">
      {images.length > 0 ? (
        <>
          <div className="image-grid">
            {images.map((imgData, index) => (
              <div key={index} className="image-card">
                <img
                  src={`data:image/jpeg;base64,${imgData}`}
                  alt={`Image ${index + 1}`}
                />
              </div>
            ))}
          </div>
          <div className="pagination">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="nav-button"
            >
              <CircleArrowLeft />
            </button>
            <span className="page-number">{currentPage}</span>
            <button
              onClick={() => paginate(currentPage + 1)}
              className="nav-button"
              disabled={images.length < imagePerPage}
            >
              <CircleArrowRight />
            </button>
          </div>
        </>
      ) : (
        <div className="no-images">No images found</div>
      )}
    </div>
  );
};

export default GetImage;