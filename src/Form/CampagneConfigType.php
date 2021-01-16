<?php

namespace App\Form;

use App\Entity\Campagne;
use App\Form\DataTransformer\ArrayToStringTransformer;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class CampagneConfigType extends AbstractType
{
    /**
     * @var ArrayToStringTransformer $transformer
     */
    protected $transformer;

    /**
     * CampagneConfigType constructor.
     * @param ArrayToStringTransformer $transformer
     */
    public function __construct(ArrayToStringTransformer $transformer)
    {
        $this->transformer = $transformer;
    }

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('weeksLevel1',HiddenType::class)
            ->add('weeksLevel2', HiddenType::class)
        ;
        $builder->get('weeksLevel1')->addModelTransformer($this->transformer);
        $builder->get('weeksLevel2')->addModelTransformer($this->transformer);
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Campagne::class,
        ]);
    }
}
