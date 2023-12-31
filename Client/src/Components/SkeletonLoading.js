import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Skeleton } from '@mui/material';

const data = [
    {
      src: 'https://i1-vnexpress.vnecdn.net/2019/07/30/6-1564483264.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=TkV1XXjKTPie5OaSLU4hVQ',
      title: 'Don Diablo @ Tomorrowland Main Stage 2019 | Official…',
      channel: 'Don Diablo',
      views: '396k views',
      createdAt: 'a week ago',
    },
    {
      src: 'https://i1-vnexpress.vnecdn.net/2019/07/30/4-1564483263.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=U5jVQSZvWf0FUXmM3uoxNg',
      title: 'Queen - Greatest Hits',
      channel: 'Queen Official',
      views: '40M views',
      createdAt: '3 years ago',
    },
    {
      src: 'https://i1-vnexpress.vnecdn.net/2019/07/30/1-1564483263.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=iAYS0CmRzxF3Fts_2ukaYw',
      title: 'Calvin Harris, Sam Smith - Promises (Official Video)',
      channel: 'Calvin Harris',
      views: '130M views',
      createdAt: '10 months ago',
    },
  ];

function Media(props) {
  const { loading = false } = props;

  return (
    <Grid container wrap="wrap" marginLeft={{ xs: "10%", sm:"8%", md: "20%" }} gap="10px">
      {(loading ? Array.from(new Array(3)) : data).map((item, index) => (
        <Box key={index} sx={{ width: 310, marginRight: 0.5, my: 5 }}>
          {item ? (
            <img
              style={{ width: 210, height: 118 }}
              alt={item.title}
              src={item.src}
            />
          ) : (
            <Skeleton variant="rectangular" width={310} height={218}/>
          )}
          {item ? (
            <Box sx={{ pr: 2 }}>
              <Typography gutterBottom variant="body2">
                {item.title}
              </Typography>
              <Typography display="block" variant="caption" color="text.secondary">
                {item.channel}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {`${item.views} • ${item.createdAt}`}
              </Typography>
            </Box>
          ) : (
            <Box sx={{ pt: 0.5 }}>
              <Skeleton />
              <Skeleton width="60%" />
              <Skeleton width="80%" />
              <Skeleton width="85%" />
            </Box>
          )}
        </Box>
      ))}
    </Grid>
  );
}

export default function SkeletonLoadingRendering() {
  return (
    <Box sx={{ overflow: 'hidden' }}  marginTop="50px">
      <Media loading />
      <Media loading />
    </Box>
  );
}
