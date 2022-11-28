import { useState, useEffect, Suspense, lazy } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Skeleton from '@mui/material/Skeleton';
import "../Dashboard/Dashboard.css";
import "../Dashboard/DashboardM.css";
// import SearchCard from './SearchCard';
const SearchCard = lazy(() => import('./SearchCard'));

const Search = () => {
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(true);
    const { searchQuery } = useParams();
    var maxResult = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

    useEffect(() => {
        const fetchSearchData = async () => {
            const SearchData = await axios.get('/search', {
                params: {
                    part: 'snippet',
                    maxResults: 10,
                    q: searchQuery,
                    key: process.env.REACT_APP_YT_API,
                    headers: {
                        'Cache-Control': 'max-age=2592000',
                    }
                }
            });

            if (SearchData) {
                setSearchResult(SearchData.data.items);
                setLoading(false);
            }
            console.log(SearchData.data);
        }
        fetchSearchData();
    }, [searchQuery]);

    const lazyFallback = () => {
        return (
            <div className='skeleton-main'>
                <Skeleton className="skeleton-thumb" variant="rectangular" sx={{ bgcolor: 'var(--secondary-alt)' }} />
                <div className="skeleton-info">
                    <Skeleton className="skeleton-avatar" variant="circular" width={36} height={36} sx={{ bgcolor: 'var(--secondary-alt)' }} />
                    <div className="skeleton-text">
                        <Skeleton variant="text" width="90%" height={20} sx={{ bgcolor: 'var(--secondary-alt)' }} />
                        <Skeleton variant="text" width="60%" height={20} sx={{ bgcolor: 'var(--secondary-alt)' }} />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className='dashboard-main'>
            <h1>Results for "{searchQuery}"</h1>
            <div className="dashboard-container">
                {!loading ? searchResult.map((item) => {
                    return (
                        <Suspense fallback={lazyFallback} key={item.id.videoId + Math.random()} >
                            <SearchCard video={item} />
                        </Suspense>
                    )
                })
                    : maxResult.map((obj) => {
                        return (
                            <div className='skeleton-main' key={obj}>
                                <Skeleton className="skeleton-thumb" variant="rectangular" sx={{ bgcolor: 'var(--secondary-alt)' }} />
                                <div className="skeleton-info">
                                    <Skeleton className="skeleton-avatar" variant="circular" width={36} height={36} sx={{ bgcolor: 'var(--secondary-alt)' }} />
                                    <div className="skeleton-text">
                                        <Skeleton variant="text" width="90%" height={20} sx={{ bgcolor: 'var(--secondary-alt)' }} />
                                        <Skeleton variant="text" width="60%" height={20} sx={{ bgcolor: 'var(--secondary-alt)' }} />
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Search