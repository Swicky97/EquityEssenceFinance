import React from "react";
import { CommentGet } from "../../../Models/Comment";
import { formatDatetime } from "../../../Helpers/NumberFormatting";

type Props = {
  comment: CommentGet;
};

const StockCommentListItem = ({ comment }: Props) => {
  return (
    <div className="relative grid grid-cols-1 gap-4 ml-4 p-4 mt-8 w-full border rounded-lg bg-white shadow-lg">
      <div className="relative flex gap-4">
        <div className="flex flex-col w-full">
          <div className="flex flex-row justify-between">
            <p className="flex relative text-xl whitespace-nowrap truncate overflow-hidden items-center">
              <div className="mr-4">
                {comment.title}
              </div>
              <div className="text-sm text-gray-500">
                {formatDatetime(comment.createdOn)}
              </div>
            </p>
          </div>
          <p className="text-dark text-sm">@{comment.createdBy}</p>
        </div>
      </div>
      <p className="-mt-4 text-gray-500">{comment.content}</p>
    </div>
  );
};

export default StockCommentListItem;