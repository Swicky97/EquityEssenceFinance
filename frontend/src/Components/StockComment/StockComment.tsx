import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Spinner from "../Spinner/Spinner";
import { commentGetAPI, commentPostAPI } from "../../Services/CommentService";
import StockCommentForm from "./StockCommentForm/StockCommentForm";
import { CommentGet } from "../../Models/Comment";
import StockCommentList from "./StockCommentList/StockCommentList";
import { useAuth0 } from "@auth0/auth0-react";

type Props = {
  stockSymbol: string;
};

type CommentFormInputs = {
  title: string;
  content: string;
};

const StockComment = ({ stockSymbol }: Props) => {
  const [comments, setComment] = useState<CommentGet[] | null>(null);
  const [loading, setLoading] = useState<boolean>();
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    getComments();
  }, []);

  const handleComment = (e: CommentFormInputs) => {
    commentPostAPI(e.title, e.content, stockSymbol, getAccessTokenSilently)
      .then((res) => {
        if (res) {
          toast.success("Comment created successfully!");
          getComments();
        }
      })
      .catch((e) => {
        toast.warning(e);
      });
  };

  const getComments = () => {
    setLoading(true);
    commentGetAPI(stockSymbol, getAccessTokenSilently).then((res) => {
      setLoading(false);
      setComment(res!.data);
    });
  };
  return (
    <div className="flex flex-col">
      <StockCommentForm symbol={stockSymbol} handleComment={handleComment} />
      {loading ? <Spinner /> : <StockCommentList comments={comments!} />}
    </div>
  );
};

export default StockComment;