import javax.media.opengl.*;
import codeanticode.glgraphics.*;
import remixlab.proscene.*;

GLModel points;
GLModel grid;
Scene scene;
KeyFrameInterpolator kfi;


int data_rows = 1;
int max_points = 100000;
int rand_x = 2000;
int rand_y = 2000;
int rand_z = 2000;
int[] blessed = new int[max_points];
float[] coord_x = new float[max_points];
float[] coord_y = new float[max_points];
float[] coord_z = new float[max_points];
int min_bright =30;
int offset = 4;
PFont debug;



void setup() {
  size(screen.width-40, screen.height-100, GLConstants.GLGRAPHICS);
  scene = new Scene(this); 
  kfi = new KeyFrameInterpolator(this); 
  scene.setAxisIsDrawn(false);
  scene.setGridIsDrawn(false);
  scene.setRadius(5000);
  scene.camera().showEntireScene();

  load_data();
  debug = createFont("Arial", 14);
  frameRate(1000);

  drawgrid(10,50,20);
  
      for (int i = 0; i < max_points; i++)
      {
       blessed[i] = 50;
      }
}


void draw() 
{
   //note the framerate 
 frame.setTitle(str(round(frameRate))+"fps");
 
 bless();
 
 // When drawing GLModels, the drawing calls need to be encapsulated 
 // between beginGL()/endGL() to ensure that the camera configuration 
 // is properly set.
 GLGraphics renderer = (GLGraphics)g;
 renderer.beginGL(); 
 
 // We get the gl object contained in the GLGraphics renderer.
 GL gl = renderer.gl;

         gl.glDisable(GL.GL_DEPTH_TEST);
         gl.glEnable(GL.GL_BLEND);
         gl.glBlendFunc(GL.GL_SRC_ALPHA,GL.GL_ONE);

   //Move everything we draw into the middle of the screen (or could just move the camera)
   translate(width/2,height/2,0); 
   
  // Disabling depth masking to properly render a semitransparent
  // object without using depth sorting.
  gl.glDepthMask(false);  
    points.render(); 
  
  gl.glDepthMask(true);
  
  
  
  grid.render();
   
    /////////////////////////////
    // Update (load) Vertex data
    /////////////////////////////
   
      points.beginUpdateVertices();
      for (int i = 0; i < max_points; i++)
      {
        points.updateVertex(i, coord_x[i] + random(offset), coord_y[i] + random(offset), coord_z[i] + random(offset));
      }
      points.endUpdateVertices();
   
   
    /////////////////////////////
    // Update Vertex Colour
    /////////////////////////////
      points.beginUpdateColors();
      for (int i = 0; i < max_points; i++)
      {
        points.updateColor(i, 255, 255, 255, blessed[i]);
      }
      points.endUpdateColors();  
   
 renderer.endGL(); 

}



void drawgrid(float spacing, int gridsize, float gridStroke)
{
  int gridverts = gridsize*4;
  
  grid = new GLModel(this, gridverts+4, LINES, GLModel.STATIC);
  grid.initColors();

  grid.beginUpdateVertices();
    for (int i = 0; i < gridverts+4; i=i+4)
    {
      grid.updateVertex(i,-(gridverts*(spacing/2)), (i*spacing)-((gridverts/2)*spacing), 0);
      grid.updateVertex(i+1,(gridverts*(spacing/2)), (i*spacing)-((gridverts/2)*spacing), 0);

      grid.updateVertex(i+2,(i*spacing)-((gridverts/2)*spacing),-(gridverts*(spacing/2)), 0);
      grid.updateVertex(i+3,(i*spacing)-((gridverts/2)*spacing),(gridverts*(spacing/2)), 0); 
    }
  grid.endUpdateVertices();
  
  grid.beginUpdateColors();
    for (int i = 0; i < gridverts+4; i=i+4)
    {
      if (i%40 == 0)
      {
        grid.updateColor(i,   255, 255, 255, gridStroke+30);
        grid.updateColor(i+1, 255, 255, 255, gridStroke+30);
        grid.updateColor(i+2, 255, 255, 255, gridStroke+30);
        grid.updateColor(i+3, 255, 255, 255, gridStroke+30);
      }      
      else if(i%10 == 0)
      {
        grid.updateColor(i,   255, 255, 255, gridStroke+15);
        grid.updateColor(i+1, 255, 255, 255, gridStroke+15);
        grid.updateColor(i+2, 255, 255, 255, gridStroke+15);
        grid.updateColor(i+3, 255, 255, 255, gridStroke+15);
      }
      else
      {
        grid.updateColor(i,   255, 255, 255, gridStroke);
        grid.updateColor(i+1, 255, 255, 255, gridStroke);
        grid.updateColor(i+2, 255, 255, 255, gridStroke);
        grid.updateColor(i+3, 255, 255, 255, gridStroke);  
      }
    }
  grid.endUpdateColors(); 
}



void load_data()
{
     
    for (int i = 0; i < max_points; i++)
    {
      coord_x[i] = random(rand_x)-rand_x/2;
      coord_y[i] = random(rand_y)-rand_y/2;
      coord_z[i] = random(rand_z);
    }


    points = new GLModel(this, max_points, POINTS, GLModel.DYNAMIC);
    points.initColors();
    points.setPointSize(1);
    /////////////////////////////
    // Update (load) Vertex data
    /////////////////////////////
   
      points.beginUpdateVertices();
      for (int i = 0; i < max_points; i++)
      {
        points.updateVertex(i, coord_x[i] + random(offset), coord_y[i] + random(offset), coord_z[i] + random(offset));
      }
      points.endUpdateVertices();


    /////////////////////////////
    // Update Vertex Colour
    /////////////////////////////
      points.beginUpdateColors();
      for (int i = 0; i < max_points; i++)
      {
        points.updateColor(i, 255, 255, 255, min_bright);
      }
      points.endUpdateColors();  
}


void bless()
{
      for (int i = 0; i < max_points; i++)
      {
        if(int(random(1000000))==1) blessed[i] = 255;
        if (blessed[i] > min_bright) blessed[i] = blessed[i] -2;
        if (blessed[i] <= min_bright) blessed[i] = blessed[i] + int(random(20));
      }
}