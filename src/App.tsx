import { useState, useMemo } from 'react';
import SelectFile from './components/SelectFile';
import jsonfile from 'jsonfile';
import { UserPermissions } from './types/bds.types';
import Loading from './components/Loading';
import Editor from './components/Editor';

function App() {
  const [json, setJson] = useState<UserPermissions[] | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (file: File) => {
    setLoading(true);
    try {
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = (e) => {
        if (e.target) {
          const json = JSON.parse(e.target.result as string);
          setJson(json);
        }
      };
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!json) {
    return <SelectFile onFileSelected={(file) => handleFileChange(file)} />;
  }

  return (
    <Editor
      permissions={json}
      onChange={(permissions) => setJson(permissions)}
    />
  );
}

export default App;
