<?php
/**
 * Created by PhpStorm.
 * User: mohamedchehimi
 * Date: 16/01/21
 * Time: 20:01
 */

namespace App\Form\DataTransformer;


use Symfony\Component\Form\DataTransformerInterface;

class ArrayToStringTransformer implements DataTransformerInterface
{
    public function transform($value)
    {
        return \json_encode($value);
    }
    public function reverseTransform($value)
    {
        return  \json_decode($value, true);
    }
}