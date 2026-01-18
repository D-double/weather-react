import { images } from '../../assets/image'
import s from './loader.module.scss'

const Loader = () => {
  return (
    <div className={s.loader}>
        <img src={images.loading} alt="" />
    </div>
  )
}

export default Loader