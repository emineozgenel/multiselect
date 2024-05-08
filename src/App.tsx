/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { Selectbox } from 'components';
import { useFetch } from 'hooks';
import './styles/app.scss';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { data, error, loading, fetchData: getCharacters } = useFetch('getCharacters');
  const [search, setSearch] = useState<string | null>(null);

  useEffect(() => {
    if (search) {
      getCharacters({ name: search });
    } else {
      getCharacters();
    }
  }, [search]);

  return (
    <div className="main flex justify-center flex-col">
      <Selectbox options={data?.results} search={search} setSearch={setSearch} loading={loading} error={error} />
      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover
      />
    </div>
  );
}

export default App;
