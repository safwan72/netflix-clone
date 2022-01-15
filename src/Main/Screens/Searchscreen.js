import React from 'react'
import Nav from '../Components/Nav';
import FooterLogin from '../Components/FooterLogin';
import axios from "../../Utils/axios";
import reqs from '../../Utils/requests';
import Loader from '../../Utils/Loader';
import SearchRows from '../Components/SearchRows';
import '../Components/CSS/searcrow.css';
const Searchscreen = () => {
    const [searchquery, setsearchquery] = React.useState(null);
    const [allmovie, setallmovie] = React.useState([])
    const handlesearch = (e) => {
        let keyword = e.target.value;
        setsearchquery(keyword);
    }
    function mergeArrays(...arrays) {
        let jointArray = []

        arrays.forEach(array => {
            jointArray = [...jointArray, ...array]
        })
        const uniqueArray = jointArray.filter((item, index) => jointArray.indexOf(item) === index)
        return uniqueArray
    }
    React.useEffect(() => {
        async function fetchData() {
            const request = await axios.get(reqs.fetchActionMovies);
            setallmovie(allmovie => mergeArrays([...allmovie, request.data?.results].flat(1)));
            return request;
        }
        fetchData();
    }, []);
    React.useEffect(() => {
        async function fetchData() {
            const request = await axios.get(reqs.fetchComedyMovies);
            setallmovie(allmovie => mergeArrays([...allmovie, request.data?.results].flat(1)));
            return request;
        }
        fetchData();
    }, []);

    React.useEffect(() => {
        async function fetchData() {
            const request = await axios.get(reqs.fetchHorrorMovies);
            setallmovie(allmovie => mergeArrays([...allmovie, request.data?.results].flat(1)));
            return request;
        }
        fetchData();
    }, []);
    React.useEffect(() => {
        async function fetchData() {
            const request = await axios.get(reqs.fetchNetflixOriginals);
            setallmovie(allmovie => mergeArrays([...allmovie, request.data?.results].flat(1)));
            return request;
        }
        fetchData();
    }, []);
    React.useEffect(() => {
        async function fetchData() {
            const request = await axios.get(reqs.fetchRomanceMovies);
            setallmovie(allmovie => mergeArrays([...allmovie, request.data?.results].flat(1)));
            return request;
        }
        fetchData();
    }, []);

    const items = allmovie.filter((data, index, arr) => {
        if (searchquery == null && arr.indexOf(data) === index)
            return data
        else if ((data?.name?.toLowerCase().includes(searchquery?.toLowerCase()) || data?.original_name?.toLowerCase().includes(searchquery?.toLowerCase()) || data?.overview?.toLowerCase().includes(searchquery?.toLowerCase()) || data?.title?.toLowerCase().includes(searchquery?.toLowerCase()) || data?.original_title?.toLowerCase().includes(searchquery?.toLowerCase())) && arr.indexOf(data) === index) {
            return data
        }
        else {
            return null
        }
    }).map((data, index) => {
        return (
            <SearchRows movie={data} key={index} />
        )
    })

    return (
        <div style={{ height: '100%' }}>
            <Nav handlesearch={handlesearch} isHome={true} showSearch={false} />
            <div className='row__row__search__component'>
                {allmovie && allmovie.length > 0 ? (
                    <div className='row_row_search_flex'>
                        {items}
                    </div>
                ) : (<Loader />)}
            </div>
            <FooterLogin />
        </div>
    )
}

export default Searchscreen
