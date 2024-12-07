import { FC, useEffect, useRef, useState } from "react";
import { images } from "../../assets/image";
import { useAppDispatch } from "../../store/hooks";
import { dataCity } from "../../store/weather";


const Header: FC = () => {
  const dispatch = useAppDispatch()
  const inputRef = useRef<HTMLInputElement>(null)
  const setCityListener = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const text = inputRef.current?.value;
    if (e.key == 'Enter' && text) {
      dispatch(dataCity(text))
      inputRef.current.value = ''
    }
  }
  const [theme, setTheme] = useState('light');
    const changeTheme = ()=>{
        if (theme == 'light') {
            setTheme('dark')
        } else {
            setTheme('light')            
        }
    }

    useEffect(()=>{
        const localTheme = localStorage.getItem('theme');
        if(localTheme)
        setTheme(localTheme)
    }, [])

    useEffect(()=>{
        localStorage.setItem('theme', theme)
        if (theme == 'light') {
            document.body.classList.remove('active');
        } else {
            document.body.classList.add('active');            
        }
    }, [theme])
  return (
    <nav className="nav">
      <a href="" className="logo">
        <img src={images.logo} alt="" className="logo__img" />
        vue weather
      </a>
      <div className="search">
        <img src={images.city} alt="" className="search__icon" onClick={changeTheme} />
        <input type="text" className="search__input" placeholder="Выбрать город" ref={inputRef} onKeyDown={setCityListener} />
      </div>
    </nav>
  )
}

export default Header;