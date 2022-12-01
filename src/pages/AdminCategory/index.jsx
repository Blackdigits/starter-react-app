import { Typography, Skeleton } from '@mui/material';
import React, {useEffect, useState} from 'react'
import { host_url } from '../../config';
import {setDefaultDataResponse, getAllCategory, deleteCategory} from '../../features/category/categorySlice';
import styled from 'styled-components';
import {Link} from "react-router-dom";
import swal from "sweetalert"
import { useSelector, useDispatch } from 'react-redux';
import { DataGrid} from '@mui/x-data-grid';
import {DeleteOutline} from "@mui/icons-material";

const Container = styled.div`
    display: flex;
    flex: 4;
    flex-direction: column;
    padding: 20px;
    border: 1px solid rgba(0,0,0,.125);
    margin: 0 10px 10px 10px;
    border-radius: 5px;
`;

const Title = styled.div`
  cursor: pointer;
`;

const ButtonEdit = styled.div`
  border-radius: 10px;
  padding: 5px 10px;
  background-color: #3bb077;
  color: white;
  cursor: pointer;
  margin-right: 20px;
`;

const Image = styled.img`
    margin: 10px 0;
    width: 70px;
    object-fit: cover
`;

const DeleteContainer = styled.div`
  cursor: pointer
`;

const AdminCategory = () => {
  const dispatch = useDispatch();
  const dataCategory = useSelector(state => state.category);

  const handleDelete = (id) => {
    swal({
      title: "Apakah anda yakin?",
      text: "Kategori akan dihapus ketika menekan tombol OK",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteCategory(id));
        swal("Success", "Kategori berhasil dihapus", "success");
      } else {
        swal("Kategori gagal dihapus");
      }
    });
  }

  const columns = [
    { field: 'name', headerName: 'KATEGORI', width: 300,
    renderCell: (params) => {
      return(
          <Title>{params.row.name}</Title>
      )
    },
    },
    { field: 'image', headerName: 'GAMBAR KATEGORI', width: 400,
    renderCell: (params) => {
        return(
          <Image src={params.row.image ? `${host_url}/${params.row.image}` : ''} />
        )
    },
    },
    {
      field: "action",
      headerName: "ACTION",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link style={{ textDecoration: 'none' }} to={`/admin/editKategori/${params.row._id}`}>
              <ButtonEdit>EDIT</ButtonEdit>
            </Link>
            <DeleteContainer onClick={() => handleDelete(params.row._id)} >
              <DeleteOutline style={{ fontSize: 30, color: "red"}}/>
            </DeleteContainer>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    dispatch(setDefaultDataResponse());
    dispatch(getAllCategory());
  }, [dataCategory.dataResponse]);
  useEffect(() => {
    dispatch(getAllCategory());
    dispatch(setDefaultDataResponse());
  }, []);

  return (
    <Container>
        <Typography variant="h5">Data Kategori</Typography>
        {dataCategory.data ? 
          <DataGrid
            rows={dataCategory.data.data}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            getRowId={(row) => row._id}
            sx={{ textTransform: 'uppercase', marginTop: 1 }}
          />
          :
          <Skeleton variant="rounded" width={'100%'} height={'100%'} />
        }
    </Container>
  )
}

export default AdminCategory;




    