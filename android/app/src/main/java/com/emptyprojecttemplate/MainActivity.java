package com.emptyprojecttemplate;

import com.reactnativenavigation.controllers.SplashActivity;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.graphics.Color;
import android.view.Gravity;
import android.util.TypedValue;

public class MainActivity extends SplashActivity {
    // /**
    //  * Returns the name of the main component registered from JavaScript.
    //  * This is used to schedule rendering of the component.
    //  */
    // @Override
    // protected String getMainComponentName() {
    //     return "emptyprojecttemplate";
    // }
    @Override
    public LinearLayout createSplashLayout() {
        LinearLayout view = new LinearLayout(this);
        TextView textView = new TextView(this);
        
        view.setBackgroundColor(Color.parseColor("#7b1fa2"));
        view.setGravity(Gravity.CENTER);

        textView.setTextColor(Color.parseColor("#ffffff"));
        textView.setText("Beautiful Places" );
        textView.setGravity(Gravity.CENTER);
        textView.setTextSize(TypedValue.COMPLEX_UNIT_DIP,55);

        // textView.setTextColor(Color.parseColor("#ffffff"));
        // textView.setText("Places");
        // textView.setTextSize(TypedValue.COMPLEX_UNIT_DIP,50);
        
        view.addView(textView);
        return view;
    }
}
