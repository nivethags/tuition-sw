// UploadRouter.jsx
import { useParams } from 'react-router-dom';
import MaterialUploadPage from './MaterialUploadPage';
import MarkUploadPage from './MarkUploadPage';

const UploadRouter = () => {
  const { type } = useParams();
  return type.toLowerCase() === 'material' ? <MaterialUploadPage /> : <MarkUploadPage />;
};

export default UploadRouter;
