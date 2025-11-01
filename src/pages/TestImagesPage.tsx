import React from 'react';
import { REVIEWS } from '../core/data/reviews';

const TestImagesPage: React.FC = () => {
  return (
    <div style={{ 
      background: '#1a1a1a', 
      color: 'white', 
      padding: '40px',
      minHeight: '100vh'
    }}>
      <h1 style={{ fontSize: '32px', marginBottom: '20px' }}>Test Review Images</h1>
      
      <div style={{ marginBottom: '20px', padding: '20px', background: '#2a2a2a', borderRadius: '10px' }}>
        <h2>Environment Info:</h2>
        <p>PUBLIC_URL: "{process.env.PUBLIC_URL || '(empty)'}"</p>
        <p>NODE_ENV: {process.env.NODE_ENV}</p>
      </div>

      {REVIEWS.map((review) => (
        <div key={review.id} style={{ 
          marginBottom: '40px',
          padding: '20px',
          background: '#2a2a2a',
          borderRadius: '10px'
        }}>
          <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>{review.author}</h2>
          <p style={{ color: '#999', marginBottom: '20px' }}>Rating: {review.rating}/5</p>
          
          <h3 style={{ marginBottom: '10px' }}>Photos ({review.photos?.length || 0}):</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 200px)', gap: '20px' }}>
            {review.photos?.map((photo, index) => (
              <div key={index} style={{ border: '2px solid #444', borderRadius: '8px', overflow: 'hidden' }}>
                <p style={{ fontSize: '12px', padding: '5px', background: '#333' }}>
                  Path: {photo}
                </p>
                <img 
                  src={photo}
                  alt={`${review.author} - Photo ${index + 1}`}
                  style={{ 
                    width: '200px', 
                    height: '200px', 
                    objectFit: 'cover',
                    display: 'block'
                  }}
                  onLoad={(e) => {
                    console.log('✅ Loaded:', photo);
                    (e.target as HTMLImageElement).style.border = '3px solid green';
                  }}
                  onError={(e) => {
                    console.error('❌ Failed:', photo);
                    (e.target as HTMLImageElement).style.border = '3px solid red';
                    (e.target as HTMLImageElement).alt = '❌ FAILED TO LOAD';
                    (e.target as HTMLImageElement).style.background = '#ff0000';
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      ))}

      <div style={{ marginTop: '40px', padding: '20px', background: '#2a2a2a', borderRadius: '10px' }}>
        <h2>Direct Image Test:</h2>
        <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
          <div>
            <p>Using absolute path:</p>
            <img 
              src="/images/reviews/1/review-1-1.jpg" 
              style={{ width: '150px', height: '150px', objectFit: 'cover', border: '2px solid white' }}
              onError={(e) => (e.target as HTMLImageElement).style.border = '5px solid red'}
            />
          </div>
          <div>
            <p>Using PUBLIC_URL + path:</p>
            <img 
              src={`${process.env.PUBLIC_URL}/images/reviews/1/review-1-1.jpg`}
              style={{ width: '150px', height: '150px', objectFit: 'cover', border: '2px solid white' }}
              onError={(e) => (e.target as HTMLImageElement).style.border = '5px solid red'}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestImagesPage;
