// Review List fetching & boxing comp
import { getReviewDetail } from '../../util/apiCollection';
import { useEffect, useState } from 'react';
import { Review, ReviewComments } from '../../types/mainPageTypes';
import { useNavigate, useParams } from 'react-router-dom';
import { CommentInput } from './CommentInput';
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import Comment from './Comment';
import HandleLike from './Like';

const RvDetail = () => {
  interface markdownProps {
    markdown: string | undefined;
  }
  const navigate = useNavigate();
  const params = useParams();
  const reviewId = Number(params.id);
  const [review, setReview] = useState<Review>({
    content: '',
    createdAt: '',
    productDetail: '',
    productName: '',
    recommendNumber: 0,
    reviewComments: [],
    title: '',
    type: '',
    userId: 0,
    userImage: '',
    view: 0,
    writer: '',
  });
  const [comments, setComments] = useState<ReviewComments[]>([]);
  const getParsedDate = (createdAt: string) => {
    return new Date(createdAt).toLocaleDateString('ko-KR');
  };

  useEffect(() => {
    const getReviewData = async () => {
      const { data } = await getReviewDetail(reviewId);
      setReview(data);
      setComments(data?.reviewComments);
    };
    getReviewData();
  }, []);

  const onTypeClick = () => {
    navigate(`/categories/review/${params.id}`);
  };

  const ConvertedContent = ({ markdown = review?.content }: markdownProps) => {
    return (
      <>
        {markdown && (
          <div id="viewer">
            <Viewer initialValue={markdown} />
          </div>
        )}
      </>
    );
  };
  const CommentView = () => {
    if (review !== undefined && review?.reviewComments?.length > 0) {
      return (
        <div className="flex flex-col items-center w-full my-8">
          <div className="flex justify-start w-full p-4 mb-4 text-2xl font-bold ">
            Comment
          </div>
          {review.reviewComments.map((el: ReviewComments, idx: number) => (
            <Comment key={idx} reviewComments={el} />
          ))}
        </div>
      );
    } else return null;
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center w-3/5">
        <div className="w-full ">
          <div className="flex justify-start p-4 m-4 text-sm">
            <div
              className="p-1 px-2 rounded-full bg-slate-100 text-slate-600"
              role="button"
              onClick={onTypeClick}
            >
              {review?.type.toLocaleLowerCase()}
            </div>
          </div>
          <div className="flex justify-center p-4 m-4 text-2xl font-bold">
            {review?.title}
          </div>
        </div>
        <div className="flex items-end justify-end w-full p-4 border-b border-gray-200">
          <img
            className="w-12 h-12 m-2 rounded-full"
            src={`https://codetech.nworld.dev${review?.userImage}`}
          />
          <div className="flex flex-col items-end p-2">
            <div>{review?.writer}</div>
            <div>{getParsedDate(review?.createdAt)}</div>
          </div>
        </div>
        <section className="flex flex-col items-center border-b border-gray-200">
          <div id="viewer" className="p-4 my-16 whitespace-pre-wrap">
            <ConvertedContent markdown={review?.content} />
          </div>
          <div className="flex items-end my-8 ">
            <HandleLike
              recommendNumber={review.recommendNumber}
              reviewId={reviewId}
            />
          </div>
          <CommentView />
          <CommentInput />;
        </section>
      </div>
    </div>
  );
};

export default RvDetail;
