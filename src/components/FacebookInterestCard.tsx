import { IconType } from '@react-icons/all-files';
import React from 'react';
import { Button, List, Modal } from 'rsuite';
import { AiOutlineUnorderedList } from '@react-icons/all-files/ai/AiOutlineUnorderedList';
import { fetchinterestList } from 'utils/api';
import { useQuery } from '@tanstack/react-query';
import { InterestRecord } from 'utils/types';
import { FiExternalLink } from '@react-icons/all-files/fi/FiExternalLink';

interface FacebookInterestCard {
  content: string;
  Icon: IconType;
  text: string;
  color: string;
  detailList: [string, string];
}

const FacebookInterestCard: React.FC<FacebookInterestCard> = ({
  content,
  Icon,
  text,
  color,
  detailList,
}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { data = [], isLoading, isError } = useQuery<InterestRecord[], Error>(
    ["interest-card", ...detailList],
    () => fetchinterestList(detailList)
  );

  const loadCollection = (list_: InterestRecord[]) => {
    return list_?.length > 0 ? list_.map((item, index) => (
      <List.Item key={index} className='d-flex'>
        {item.link !== "" ? <a
          className='d-flex align-items-center external-link'
          target='_blank'
          href={`${item.link}`}
          rel="noreferrer"
        >
          <p>{item.name}</p>
          <FiExternalLink />
        </a> :
          <p>{item.name}</p>
        }
      </List.Item>
    )) : <div>
      No items found
    </div>
  };

  return (
    <>
      <Modal overflow={true} open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>{detailList[1]}s</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <List bordered>
            {isLoading ? (
              <div>Loading...</div>
            ) : isError ? (
              <div>Error fetching products</div>
            ) : data && (<>
              {loadCollection(data)}
            </>)
            }
          </List>
        </Modal.Body>
      </Modal>
      <div className="facebook-interest-card" style={{ backgroundColor: color }}>
        <div className="card-header">
          <div className="number">{content}</div>
          <div className="card-left">
            {/* <Button style={{ display: 'flex', gap: "8px" }} onClick={handleOpen} size="sm" className='filter-btn' color='violet' appearance="primary">
              <AiOutlineUnorderedList /> List
            </Button> */}
            <div className="icon">
              <Icon />
            </div>
          </div>
        </div>
        <div className="card-body">{text}</div>
      </div>
    </>
  );
};

export default FacebookInterestCard;
